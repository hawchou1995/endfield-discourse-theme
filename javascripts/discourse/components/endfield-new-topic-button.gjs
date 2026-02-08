import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";

export default class EndfieldNewTopicButton extends Component {
  @service router;
  @service composer;
  @service currentUser;

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
    {{!-- 即使未登录，也渲染外层容器，方便排查位置问题 --}}
    <div class="endfield-sidebar-new-topic-button-container">
      {{#if this.currentUser}}
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
      {{/if}}
    </div>
  </template>
}
