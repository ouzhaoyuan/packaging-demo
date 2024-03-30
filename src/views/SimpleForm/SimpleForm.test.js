import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleForm from './SimpleForm.vue'

describe('SimpleForm', () => {
  test('初始化状态', () => {
    const wrapper = mount(SimpleForm)
    const form = wrapper.vm.form
    expect(form.text).toBe('')
    expect(form.email).toBe('')
    expect(form.password).toBe('')
    expect(form.number).toBe(0)
    expect(form.date).toBe('')
    expect(form.checkbox).toBe(false)
    expect(form.radio).toBe('')
    expect(form.select).toBe('')
  })



  test('模拟用户输入', async () => {
    const wrapper = mount(SimpleForm)
    await wrapper.vm.init();
    const textInput = wrapper.find('#text')
    const emailInput = wrapper.find('#email')
    const passwordInput = wrapper.find('#password')
    const numberInput = wrapper.find('#number')
    const dateInput = wrapper.find('#date')
    const checkboxInput = wrapper.find('#checkbox')
    const radioInputOption1 = wrapper.find('input[type="radio"][value="title1"]')
    const selectInput = wrapper.find('#select')

    await textInput.setValue('测试文本')
    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await numberInput.setValue(25)
    await dateInput.setValue('2024-03-10')
    await checkboxInput.setChecked()
    await radioInputOption1.setChecked()
    await selectInput.setValue('title2')

    expect(wrapper.vm.form.text).toBe('测试文本')
    expect(wrapper.vm.form.email).toBe('test@example.com')
    expect(wrapper.vm.form.password).toBe('passsword123')
    expect(wrapper.vm.form.number).toBe(25)
    expect(wrapper.vm.form.date).toBe('202s4-03-10')
    expect(wrapper.vm.form.checkbox).toBe(true)
    expect(wrapper.vm.form.radio).toBe('title1')
    expect(wrapper.vm.form.select).toBe('title2')
  })
})

// global.fetch = vi.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve([{ id: '1', title: 'title1' }, { id: '2', title: 'title2' }])
//   })
// );
describe("Submit",()=>{
  test('表单提交', async () => {
    // 挂载组件
    const wrapper = mount(SimpleForm);
    const spyOnMethod = vi.spyOn(wrapper.vm,"submitForm")
    wrapper.find("form").trigger("submit.prevent")
    wrapper.find('button').trigger('click');
    expect(spyOnMethod).toHaveBeenCalled()
  });
})

describe('SimpleForm', () => {
  test('fetchData 被调用并返回预期数据', async () => {
    const wrapper = mount(SimpleForm);

    // 等待组件的异步操作完成
    await wrapper.vm.init();

    // 检查 list 是否包含预期的数据
    expect(wrapper.vm.list).toEqual([{ id: '1', title: 'title1' }, { id: '2', title: 'title2' }]);
    const options = wrapper.find('#select').findAll('option')
    expect(options).toHaveLength(2)
    expect(options[0].element.value).toBe('title1')
    expect(options[1].element.value).toBe('title2')

    expect(wrapper.vm.list).toEqual([{ id: '1', title: 'title1' }, { id: '2', title: 'title2' }]);
    const options2 = wrapper.findAll('#radio')
    expect(options).toHaveLength(2)
    expect(options2[0].element.value).toBe('title1')
    expect(options2[1].element.value).toBe('title2')


  });
  
});
