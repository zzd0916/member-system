import { ComponentType } from "react"
import Taro, { Component } from "@tarojs/taro"
import { inject, observer } from "@tarojs/mobx"
import { View } from '@tarojs/components'

import './components.scss'

@inject('langStore')
@observer
class ChooseLanguage extends Component {

    setLang(val: string) {
        const { langStore } = this.props
        langStore.setLng(val)
    }

    render() {
        const { langStore } = this.props
        const currentLang = langStore.getLng()
        return (
            <View className='at-row at-row__justify--around' style='margin-top:20px;text-align:center'>
                {
                    langStore.languagesList.map((item) => {
                        let cName = item.value === currentLang ? 'at-col font-30 language-active' : 'at-col font-30';
                        return (
                            <View className={cName} onClick={this.setLang.bind(this, item.value)} >
                                {item.text}
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}


export default ChooseLanguage as ComponentType