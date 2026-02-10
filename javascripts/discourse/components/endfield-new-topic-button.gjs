import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";

export default class EndfieldNewTopicButton extends Component {
  @service router;
  @service composer;
  @service currentUser;
  @service siteSettings; // 新增：用于权限检查

  get showButton() {
    // 优化1：检查用户是否登录
    if (!this.currentUser) {
      return false;
    }

    // 优化2：检查用户是否有创建主题的权限
    // 注意：这需要根据实际需求调整
    return this.currentUser.can_create_topic;
  }

  @action
  createTopic() {
    try {
      const route = this.router.currentRoute;
      
      // 防御性编程：确保 route 存在
      if (!route?.attributes) {
        this.composer.open({
          action: "createTopic",
          draftKey: "new_topic",
        });
        return;
      }

      const category = route.attributes.category;
      const tag = route.attributes.tag;

      // 优化3：更健壮的标签处理
      let tags = null;
      if (tag) {
        // 如果 tag 是对象，取 id
        if (typeof tag === "object" && tag.id) {
          tags = tag.id;
        } 
        // 如果 tag 是字符串，直接使用
        else if (typeof tag === "string") {
          tags = tag;
        }
      }

      this.composer.open({
        action: "createTopic",
        draftKey: "new_topic",
        categoryId: category?.id,
        tags: tags,
      });
    } catch (error) {
      // 优化4：错误处理
      console.error("Failed to open composer:", error);
      
      // 降级：打开不带参数的编辑器
      this.composer.open({
        action: "createTopic",
        draftKey: "new_topic",
      });
    }
  }

  <template>
    {{! v2.5 fix }}
    {{#if this.showButton}}
      <div class="endfield-sidebar-new-topic-button-container">
        <DButton
          @class="btn-primary endfield-sidebar-create-btn"
          @action={{this.createTopic}}
        >
          <div class="btn-content">
            <svg class="fa d-icon d-icon-plus svg-icon svg-string" xmlns="http://www.w3.org/2000/svg">
              <use href="#plus"></use>
            </svg>
            <span class="d-button-label">发帖</span>
          </div>
          <div class="btn-decor-corner"></div>
        </DButton>
      </div>
    {{/if}}
  </template>
}
