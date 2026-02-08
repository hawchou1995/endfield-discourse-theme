import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  if (!api.getCurrentUser()) return;
  // 继续使用 before-sidebar-sections
  api.renderInOutlet("before-sidebar-sections", EndfieldNewTopicButton);
});
