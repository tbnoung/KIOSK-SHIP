import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import {
  // Affix,
  // Anchor,
  AutoComplete,
  Alert,
  Avatar,
  // BackTop,
  Badge,
  Breadcrumb,
  Button,
  // Calendar,
  Card,
  Collapse,
  // Comment,
  // Carousel,
  Cascader,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Dropdown,
  Empty,
  Form,
  // FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  // LocaleProvider,
  message,
  Menu,
  // Mentions,
  Modal,
  notification,
  Pagination,
  // Popconfirm,
  Popover,
  // Progress,
  Radio,
  // Rate,
  Row,
  Select,
  Slider,
  Spin,
  // Statistic,
  Steps,
  Switch,
  Table,
  // Transfer,
  // Tree,
  // TreeSelect,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Upload,
  Drawer,
  Skeleton,
  // Result,
  Descriptions,
  // PageHeader,
  FormModel,
} from 'ant-design-vue'

declare module 'vue/types/vue' {
  interface Vue {
    $notification: typeof notification
    $message: typeof message
    $info: typeof Modal.info
    $success: typeof Modal.success
    $error: typeof Modal.error
    $warning: typeof Modal.warning
    $confirm: typeof Modal.confirm
  }
}
declare module '@nuxt/types' {
  interface Context {
    $notification: typeof notification
    $message: typeof message
    $info: typeof Modal.info
    $success: typeof Modal.success
    $error: typeof Modal.error
    $warning: typeof Modal.warning
    $confirm: typeof Modal.confirm
  }
}

// Vue.use(Affix)
// Vue.use(Anchor)
Vue.use(FormModel)
Vue.use(AutoComplete)
Vue.use(Alert)
Vue.use(Avatar)
// Vue.use(BackTop)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(Button)
// Vue.use(Calendar)
Vue.use(Card)
Vue.use(Collapse)
// Vue.use(Comment)
// Vue.use(Carousel)
Vue.use(Cascader)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(ConfigProvider)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(Empty)
Vue.use(Form)
// Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(List)
// Vue.use(LocaleProvider)
Vue.use(Menu)
// Vue.use(Mentions)
Vue.use(Modal)
Vue.use(Pagination)
// Vue.use(Popconfirm)
Vue.use(Popover)
// Vue.use(Progress)
Vue.use(Radio)
// Vue.use(Rate)
Vue.use(Row)
Vue.use(Select)
Vue.use(Slider)
Vue.use(Spin)
// Vue.use(Statistic)
Vue.use(Steps)
Vue.use(Switch)
Vue.use(Table)
// Vue.use(Transfer)
// Vue.use(Tree)
// Vue.use(TreeSelect)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Timeline)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Drawer)
Vue.use(Skeleton)
// Vue.use(Result)
Vue.use(Descriptions)
// Vue.use(PageHeader)

Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm

declare module '@nuxt/types' {
  interface Context {
    $notification: typeof notification
    $message: typeof message
    $info: typeof Modal.info
    $success: typeof Modal.success
    $error: typeof Modal.error
    $warning: typeof Modal.warning
    $confirm: typeof Modal.confirm
  }
}

const antdPlugin: Plugin = (context) => {
  context.$notification = notification
  context.$message = message
  context.$info = Modal.info
  context.$success = Modal.success
  context.$error = Modal.error
  context.$warning = Modal.warning
  context.$confirm = Modal.confirm
}

export default antdPlugin
