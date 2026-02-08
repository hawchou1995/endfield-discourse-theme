import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // Horizon 核心作业：使用 'before-sidebar-columns' 插槽
  // 这个插槽位于主要内容列和侧边栏列的包裹层之前，我们需要用 CSS 把它"挪"进左侧
  api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
});
