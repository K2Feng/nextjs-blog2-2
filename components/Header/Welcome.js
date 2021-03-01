import React from 'react'

import './Welcome.css'
import Logo from '../../assets/images/logo.svg'
import About from './About'

const Welcome = ({element}) => {
    return (
            <main>
                <section className='welcome'>
                    <div ref={element}>
                        <img src={Logo} alt='logo' className='welcome--logo' />
                        <p>Even if you scroll, i will stick with you</p>
                        <button className='welcome__cta-primary'>
                            Contact us
                        </button>
                    </div>
                </section>
                <About />
                <About />
                <About />
                <svg width="0" height="0">
                  <defs>
                    <clipPath id="myCurve" transform="scale(1.1 0.8)">
                      <path  d="
      M 0 620.8 C 131 799.2 189 615 318 616.8 C 462 623.2 449 723 578 736 C 722 736 757 649.6 876 659.2 C 992 667.2 1009 758.4 1143 784.8 C 1285 792 1297 693.6 1454 665.6 C 1597 663.2 1620 736 1708 738.4 C 1784 734.4 1873 705.6 1905 608.8 L 1900 0 L 0 0 Z
                      "></path>
                    </clipPath>
                  </defs>
                </svg>
            </main>
    )
}

export default Welcome
