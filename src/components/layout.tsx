import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTabBar } from 'taro-ui'
import { util, auth, lang } from '@utils'
import './components.scss';
import { inject, observer } from '@tarojs/mobx';

@inject('langStore')
@observer
export default class Layout extends Component {
    static defaultProps = {
        title:'',
    }
    componentDidMount() {
        // 登陆校验
        if (!auth.isLogin()) {
            util.reLaunch({ url: '/pages/login/login' });
        }
    }
    render() {
        const { langStore } = this.props
        const btns = [
            { title: langStore.getByKey('home'), src: '/pages/home/home', iconType: 'home' },
            { title: langStore.getByKey('report'), src: '/pages/report/list', iconType: 'list' },
            { title: langStore.getByKey('account'), src: '/pages/account/home', iconType: 'user' },
        ],
        const { title,  canBack, onReload, current = 0, noTabBar = false } = this.props
        // console.log('title, btns, canBack, onReload, current', title, btns, canBack, onReload, current);
        const hasFirstRight = typeof onReload === 'function';
        const isBankFn = typeof canBack === 'function';
        return (<View>
            {!util.isWeb ? null : <AtNavBar fixed
                title={title}
                leftText={canBack ? langStore.getByKey('back_btn') : null}
                onClickLeftIcon={_ => canBack ? isBankFn ? canBack() : Taro.navigateBack() : null}
                leftIconType={canBack ? 'chevron-left' : ''}
                onClickRgIconSt={_ => hasFirstRight ? onReload() : null}
                rightFirstIconType={hasFirstRight ? 'reload' : ''} />}
            <View className='page' style={util.isWx ? { marginTop: 0 } : {}}>
                {this.props.children}
            </View>
            {noTabBar ? null : <AtTabBar
                fixed
                tabList={btns}
                onClick={i => util.reLaunch({ url: btns[i].src })}
                current={current}
            />}
        </View>);
    }
}
