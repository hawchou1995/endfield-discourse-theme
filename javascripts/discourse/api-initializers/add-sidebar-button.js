import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  if (!api.getCurrentUser()) return;

  // 改用 'above-sidebar-sections'，这会把它放在侧边栏的最顶端（导航链接之上）
  api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
});
