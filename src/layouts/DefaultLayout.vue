<template>
    <div id="full-site">
        <Header />
        <div id="wrapper">
            <div id="background">
                <div id="gradient"></div>
            </div>
            <main>
                <div class="container">
                    <slot></slot>
                </div>
            </main>
        </div>
        <Footer />
    </div>
</template>

       

<script>
import Header from '@/components/AppHeader.vue';
import Footer from '@/components/AppFooter.vue';

export default {
    components: {
        Header,
        Footer,
    }
};
</script>
  
<style>

main{
    width: 100%;;
}
#full-site {
    width: 100%;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 0px;
    align-items: center;
    justify-content: center;
}

#wrapper {
    position: relative;
    flex-direction: column;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    padding-top: 120px;
}

#background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30em;
    background-image: url("@/assets/images/bgTopper.jpg");
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: top;
    z-index: -1;
}

#gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0.631), rgba(255, 255, 255, 0.814));
    z-index: 8888;
}
</style>
    