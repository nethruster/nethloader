import { h, Component } from 'preact'

import Button from '../shared/button/button.js'
import Logo from '../shared/logo/logo.js'
import Footer from '../shared/footer/footer.js'

import style from './home.scss'

import locale from 'locale'

const viewStrings = locale.home

export default class Home extends Component {
  render () {
    return (
      <div class={`${style.home} flex flex-full-center flex-dc`}>
        <div class='flex flex-cross-center flex-dc'>
          <Logo customClass={style.homeLogo} />
          <p class={`${style.homeText} ta-c`}>{viewStrings.intro}</p>
        </div>
        <div class={`${style.homeButtons} flex flex-full-center flex-sa`}>
          <a href='' rel='noopener' target='_blank'><Button big round text={viewStrings.buttons.more_info} /></a>
          <a href='https://github.com/nethruster/nethloader' rel='noopener' target='_blank'><Button big round transparent text={viewStrings.buttons.source_code} /></a>
        </div>
        <Footer />
      </div>
    )
  }
}
