import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import { tracked } from "@glimmer/tracking";

export default class EndfieldNewTopicButton extends Component {
  @service router;
  @service composer;
  @service currentUser;
  @service site;

  // Horizon 逻辑复刻：组件插入 DOM 时给 body 加类名
  constructor() {
    super(...arguments);
    if (this.shouldShow) {
      document.body.classList.add("endfield-has-sidebar-button");
    }
  }

  // 组件销毁时移除类名
  willDestroy() {
    super.willDestroy(...arguments);
    document.body.classList.remove("endfield-has-sidebar-button");
  }

  get shouldShow() {
    // 只有登录用户且在桌面端显示
    return this.currentUser && this.site.desktopView;
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
    {{#if this.shouldShow}}
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
