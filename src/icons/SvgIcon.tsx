import { defineComponent, computed } from "vue";
import "./style.scss";

export default defineComponent({
  name: "SvgIcon",
  props: {
    id: { type: [String, Number] },
    class: { type: String },
    icon: { type: String, required: true },
    size: { type: [String, Number] },
    color: { type: String },
  },
  setup(props) {
    const className = computed(() => {
      if (props.class) {
        return `svg-icon ${props.class}`;
      } else {
        return "svg-icon";
      }
    });
    const icon = computed(() => {
      return `#icon-${props.icon}`;
    });
    return () => (
      <svg
        class={className.value}
        aria-hidden="true"
        style={`width: ${props.size}; height: ${props.size}`}
      >
        <use xlinkHref={icon.value} fill={props.color} />
      </svg>
    );
  },
});
