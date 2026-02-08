import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 严格复刻 Glacier/Horizon 逻辑：使用 before-sidebar-columns
  if (api.getCurrentUser()) {
    api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
  }
});
