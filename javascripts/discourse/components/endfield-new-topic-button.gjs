import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import Composer from "discourse/models/composer"; // 引入 Composer 模型以使用常量

export default class EndfieldNewTopicButton extends Component {
  @service router;
  @service composer;
  @service currentUser;

  // 优化：不仅检查用户是否存在，还检查是否有发帖权限
  get showButton() {
    return this.currentUser && this.currentUser.can_create_topic;
  }

  @action
  createTopic() {
    const route = this.router.currentRoute;
    // 使用可选链 (?.) 安全访问属性
    const category = route?.attributes?.category;
    const tag = route?.attributes?.tag;

    this.composer.open({
      action: Composer.CREATE_TOPIC, // 使用官方常量代替硬编码字符串
      draftKey: Composer.DRAFT,      // 使用官方常量
      categoryId: category?.id,
      tags: tag?.id,                 // Discourse 的 tag 对象通常都有 id
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
