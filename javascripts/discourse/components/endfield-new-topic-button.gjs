import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";

export default class EndfieldNewTopicButton extends Component {
  @service router;
  @service composer;
  @service currentUser;

  get showButton() {
    // 只有登录用户才能看到发帖按钮
    return this.currentUser;
  }

  @action
  createTopic() {
    // 获取当前所在的分类（如果有）
    const route = this.router.currentRoute;
    const category = route?.attributes?.category;
    const tag = route?.attributes?.tag;

    // 打开编辑器
    this.composer.open({
      action: "createTopic",
      draftKey: "new_topic",
      categoryId: category?.id,
      tags: tag?.id,
    });
  }

  <template>
    {{#if this.showButton}}
      <div class="endfield-sidebar-button-wrapper">
        <DButton
          @class="btn-primary endfield-sidebar-create-btn"
          @action={{this.createTopic}}
        >
          <div class="btn-content">
            <svg class="fa d-icon d-icon-plus svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#plus"></use></svg>
            <span class="d-button-label">发帖</span>
          </div>
          <div class="btn-decor-corner"></div>
        </DButton>
      </div>
    {{/if}}
  </template>
}
