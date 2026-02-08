import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 只要用户登录，就渲染到侧边栏顶部区域
  if (api.getCurrentUser()) {
    api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
  }
});
