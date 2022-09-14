<template>
  <div>
    <NavBar/>
    <HomeCarousel/>
    <HomeAbout/>
    <HomeOffers/>
    <HomePartners/>
    <HomeContactUs/>
    <HomeStoreDownload/>
    <Footer/>
  </div>
</template>

<script>
  import NavBar from '../components/layouts/NavBar.vue'
  import Footer from '../components/layouts/Footer.vue'
  import HomeCarousel from '../components/home-page/HomeCarousel.vue'
  import HomeAbout from '../components/home-page/HomeAbout.vue'
  import HomeOffers from '../components/home-page/HomeOffers.vue'
  import HomePartners from '../components/home-page/HomePartners.vue'
  import HomeContactUs from '../components/home-page/HomeContactUs.vue'
  import HomeStoreDownload from '../components/home-page/HomeStoreDownload.vue'

export default {
  name: 'IndexPage',
  components:{
    NavBar,
    HomeCarousel,
    HomeAbout,
    HomeOffers,
    HomePartners,
    HomeContactUs,
    HomeStoreDownload,
    Footer,
  },
}
</script>
