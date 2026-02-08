import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  if (api.getCurrentUser()) {
    // 回归最稳妥的插槽，它位于侧边栏导航列表的正上方
    api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
  }
});
