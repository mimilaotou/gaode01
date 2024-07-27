import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { Popup,Form, Field, CellGroup,RadioGroup, Radio, DatePicker,TimePicker  } from 'vant';
import 'vant/lib/index.css';


const app = createApp(App)

app.use(Popup);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(RadioGroup);
app.use(Radio);
app.use(DatePicker);
app.use(TimePicker);
app.use(ElementPlus)
app.mount('#app')