import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Form, ScrollView } from '@tarojs/components'
import { AtAvatar, AtInput, AtList, AtListItem, AtButton, AtIcon } from 'taro-ui'
import { Layout, ChooseLanguage } from '@components'
import { config, auth, toast, http, lang, util } from '@utils'
import './account.scss'
import { inject, observer } from '@tarojs/mobx'

@inject('langStore')
@observer
class Home extends Component {
    config = {
        navigationBarTitleText: lang.getValByName('account')
    }
    state = {
        modalOpened: false,
        loginData: {},
        formData: {},
        lang: lang.getLng(),
    }
    componentWillMount() {
        const loginData = auth.getLogin();
        if (loginData.phone) {
            loginData.phone = loginData.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
        this.setState({ loginData });
    }

    componentWillReact() {
        // console.log('componentWillReact')
    }

    componentDidMount() {
        // console.log('auth', auth.getLogin());
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    async onSubmit(e) {
        const { formData: f } = this.state;
        // console.log('onSave', f);
        if (!f.oldpwd || !f.newpwd) {
            return toast.showLightError('请输入密码')
        }
        if ((await http.post('/account/postInfo', f)).state === 0) return
        toast.toast('修改密码成功')
        this.setState({ modalOpened: false });
    }
    onLogout() {
        toast.confirm({
            msg: '确定要退出登录吗?',
            async success() {
                // 设置缓存
                auth.logout(1)
            }
        })
    }

    render() {
        const { langStore } = this.props
        const { modalOpened, loginData, formData, lang } = this.state;
        const logoutTitle = langStore.getByKey('logout')
        return (
            <Layout title={this.config.navigationBarTitleText} current={2}>
                {
                    !loginData || !loginData._id ?
                        <View className='block'>
                            <AtButton type='secondary' onClick={_ => Taro.navigateTo({ url: '/pages/login' })}>登录</AtButton>
                        </View> :
                        <View>
                            <View className='header'>
                                <View className='at-row'>
                                    <View className='at-col at-col-3'>
                                        <AtAvatar text={loginData.realName} size='large'></AtAvatar>
                                    </View>
                                    <View className='at-col at-col-6'>
                                        <View className='realName'>
                                            {loginData.realName}
                                        </View>
                                        <View className='phone'>
                                            {loginData.phone}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*
            <AtList>
              <AtListItem title='充值管理' arrow='right' onClick={ _ => Taro.navigateTo({ url: '/pages/account/buy' }) } />
              <AtListItem title='支付记录' arrow='right' onClick={ _ => Taro.navigateTo({ url: '/pages/account/pay' }) } />
            </AtList>
          */}
                            <View className='block'>
                                <AtButton type='secondary' onClick={_ => this.onLogout()}>{logoutTitle}</AtButton>
                            </View>
                        </View>
                }

                {!config.tel ? null : <View className='block' style='text-align:center' onClick={_ => Taro.makePhoneCall({ phoneNumber: config.tel })}>
                    联系客服:{config.tel} (点击拨号)
        </View>}

                <ChooseLanguage />

                <View onTouchMove={e => e.stopPropagation()} className={modalOpened ? 'at-modal at-modal--active' : 'at-modal'}>
                    <View className='at-modal__overlay' onClick={_ => this.setState({ modalOpened: false })} />
                    <View className='at-modal__container'>
                        <View className='at-modal__header'>修改密码</View>
                        <ScrollView scrollY className='at-modal__content'>
                            <Form onSubmit={_ => this.onSubmit()} >
                                <AtInput name='oldpwd' title='旧密码' type='password' maxLength='16' placeholder='旧密码' onChange={oldpwd => this.setState({ formData: { ...formData, oldpwd } })} value={formData.oldpwd} />
                                <AtInput name='newpwd' title='新密码' type='password' maxLength='16' placeholder='新密码' onChange={newpwd => this.setState({ formData: { ...formData, newpwd } })} value={formData.newpwd} />
                                <Button form-type='submit' className='at-button at-button--normal at-button--primary'>提交</Button>
                            </Form>
                        </ScrollView>
                    </View>
                </View>
            </Layout>
        )
    }
};

export default Home as ComponentType