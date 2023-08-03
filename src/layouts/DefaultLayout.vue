<template>
    <div id="full-site" :class="theme">
        <Header />
        <!-- <div id="wrapper">
            <div id="background"
                :style="{ ...backgroundStyle, 'background-image': `url(@/assets/images/${backgroundImage})` }"></div>
        </div> -->
        <main>
            <slot></slot>
        </main>
        <Footer />
    </div>
</template>

       
<script>
import Header from '@/components/AppHeader.vue';
import Footer from '@/components/AppFooter.vue';
import { mapState } from 'vuex';

export default {
    components: {
        Header,
        Footer,
    },
    computed: {
        ...mapState(['theme']),

        backgroundStyle() {
            console.log('procurando');

            if (this.theme === 'night-theme') {
                console.log('night');
                return {};
            } else {
                console.log('day');
                return {};
            }
        },
        backgroundImage() {
            return this.theme === 'night-theme' ? 'nightbackground.jpg' : 'bgTopper.jpg';
        },
    },
};
</script>
  
<style>
main {
    /* background-color: var(--app-bg-color); */
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 0px;
    align-items: center;
    justify-content: center;
    z-index: 1;
}


#full-site {
    width: 100%;
}


#wrapper {
    position: relative;
    flex-direction: column;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    padding-top: 120px;
}

#background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30em;
    /* background-image: url("@/assets/images/bgTopper.jpg"); */
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: top;
}

#gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, var(--app-bg-color), rgba(255, 255, 255, 0));

}
</style>
    