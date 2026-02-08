import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";

export default class EndfieldNewTopicButton extends Component {
  @service router;
  @service composer;
  @service currentUser;

  constructor() {
    super(...arguments);
    // 核心修复：一旦组件初始化，就给 body 打上标记
    // CSS 会根据这个标记去隐藏右上角的旧按钮
    if (this.currentUser) {
      document.body.classList.add("endfield-sidebar-button-active");
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    // 组件销毁时移除标记
    document.body.classList.remove("endfield-sidebar-button-active");
  }

  get showButton() {
    // 只要有用户登录就显示
    return this.currentUser;
  }

  @action
  createTopic() {
    const route = this.router.currentRoute;
    const category = route?.attributes?.category;
    const tag = route?.attributes?.tag;

    this.composer.open({
      action: "createTopic",
      draftKey: "new_topic",
      categoryId: category?.id,
      tags: tag?.id,
    });
  }

  <template>
    {{#if this.showButton}}
      <div class="endfield-sidebar-new-topic-button-container">
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
