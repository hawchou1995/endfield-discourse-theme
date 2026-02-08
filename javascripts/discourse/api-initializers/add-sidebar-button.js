import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 使用 before-sidebar-columns，它位于布局的最外层
  // 配合 CSS 的 position: absolute，我们可以把它强制钉在左侧
  api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
});
