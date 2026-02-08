import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 核心作业：使用 before-sidebar-columns
  // 这个位置在 HTML 结构上是和侧边栏并列的，我们需要用 CSS 把它"塞"进侧边栏的格子里
  if (api.getCurrentUser()) {
    api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
  }
});
