import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 仅在侧边栏显示时加载
  if (!api.getCurrentUser()) return;

  // 【稳健选择】渲染在侧边栏各分区（Categories, Tags等）的上方
  api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
});
