import 'muse-ui/lib/styles/base.less'
import {
  Alert,
  AppBar,
  AutoComplete,
  Avatar,
  Badge,
  BottomNav,
  BottomSheet,
  Breadcrumbs,
  Button,
  Card,
  Carousel,
  Checkbox,
  Chip,
  DateInput,
  DataTable,
  Dialog,
  Divider,
  Drawer,
  ExpansionPanel,
  Form,
  Grid,
  GridList,
  Helpers,
  Icon,
  List,
  LoadMore,
  Menu,
  Pagination,
  Paper,
  Picker,
  Popover,
  Progress,
  Radio,
  Select,
  SlidePicker,
  Slider,
  Snackbar,
  Stepper,
  SubHeader,
  Switch,
  Tabs,
  TextField,
  Tooltip,
  theme
} from 'muse-ui'

const components = [Alert, AppBar, AutoComplete, Avatar, Badge, BottomNav, BottomSheet, Breadcrumbs, Button, Card, Carousel, Checkbox, Chip, DateInput, DataTable, Dialog, Divider, Drawer, ExpansionPanel, Form, Grid, GridList, Helpers, Icon, List, LoadMore, Menu, Pagination, Paper, Picker, Popover, Progress, Radio, Select, SlidePicker, Slider, Snackbar, Stepper, SubHeader, Switch, Tabs, TextField, Tooltip, theme]

export default {
  install(Vue) {
    components.forEach(c => Vue.use(c))
  }
}
