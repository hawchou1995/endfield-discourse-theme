import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 移除所有条件判断，强制渲染！
  // 无论如何，先把占位符放上去，显示与否交给组件内部逻辑
  api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
});
