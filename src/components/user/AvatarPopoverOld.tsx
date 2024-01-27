import { defineComponent } from "vue";
import { Popover } from "@arco-design/web-vue";

const AvatarPopoverOld = defineComponent({
  name: "AvatarPopover",
  components: {
    Popover,
  },
  methods: {
    handleHover() {
      // 处理悬停事件
    },
  },
  template: `
      <a-popover :title="title">
        <slot name="buttonContent"></slot>
        <template #content>
          <slot name="mycontent"></slot>
        </template>
      </a-popover>
    `,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});

export default defineComponent({
  components: {
    AvatarPopover: AvatarPopoverOld,
  },
});
