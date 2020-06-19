import {
	Button,
	Dialog,
	Field,
	CellGroup,
	Popup,
	Picker,
	DatetimePicker,
	List,
	NumberKeyboard,
	PasswordInput,
	Image,
	Toast,
	Tabbar,
	TabbarItem,
	PullRefresh
} from 'vant';

const install = function(Vue) {
	if(install.installed) return;
	Vue.component(Button.name, Button);
	Vue.component(Field.name, Field);
	Vue.component(CellGroup.name, CellGroup);
	Vue.component(Popup.name, Popup);
	Vue.component(Picker.name, Picker);
	Vue.component(List.name, List);
	Vue.component(DatetimePicker.name, DatetimePicker);
	Vue.component(NumberKeyboard.name, NumberKeyboard);
	Vue.component(PasswordInput.name, PasswordInput);
	Vue.component(Image.name, Image);
	Vue.component(PullRefresh.name, PullRefresh);
	Vue.component(Tabbar.name, Tabbar);
	Vue.component(TabbarItem.name, TabbarItem);
	// Vue.$dialog = Vue.prototype.$dialog = Dialog;
	// Vue.$toast = Vue.prototype.$toast = Toast;
};

export default {
	install
}