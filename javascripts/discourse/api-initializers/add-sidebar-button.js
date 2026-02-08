import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 使用 'above-sidebar-sections'，它稳定处于侧边栏内部的最顶端
  api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
});
