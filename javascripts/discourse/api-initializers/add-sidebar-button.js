import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // Horizon 原版作业：插在 columns 之前，然后用 CSS 把它搬运到 sidebar 区域
  api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
});
