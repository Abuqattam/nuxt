<template>
  <div dir="rtl" class="offers-section">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="12" lg="6" xl="6">
        <div class="offers-img">
          <img src="../../assets/images/about.jpg" alt="" />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6" xl="6">
        <div class="offers-data">
          <div class="offers-top">
            <div class="o-img">
              <img src="../../assets/images/offers.jpg" alt="" />
            </div>
            <div class="o-data">
              <h4>أفضل العروض</h4>
              <p>
                هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
                سيلهي
              </p>
            </div>
          </div>

          <div class="offers-medium">
            <div class="inner">
              <div class="i-img">
                <img src="../../assets/images/discount.jpg" alt="" />
                <span>25 <i>%</i></span>
              </div>
              <div class="i-data">
                <button>
                  <img src="../../assets/images/heart.svg" alt="" />
                </button>
                <div>
                  <img src="../../assets/images/lc.png" alt="" />
                </div>
                <h4>تي شيرت أساسي رجالي بياقة دائرية وأكمام قصيرة</h4>
                <div>
                  <span>2 : 16 : 22</span>
                  <a href="#" class="btn">احصل على قسيمة</a>
                </div>
              </div>
            </div>
          </div>

          <div class="offers-bottom">
            <div>
              <h3>أفضل العروض</h3>
              <p>
                هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
                سيلهي
              </p>
            </div>
            <img src="../../assets/images/best-offers.jpg" alt="" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomeOffers',
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
* {
    font-family: ge-light;
    color: #34125B;
}
.offers-img img {
    width: 100%;
}

.offers-data {
    padding: 50px 30px;
}

.offers-top {
    display: flex;
    align-items: center;
    column-gap: 25px;
    margin-bottom: 100px;
}

.offers-top h4 {
    font-size: 24px;
    font-family: 'ge-bold';
}

.offers-top p {
    font-size: 16px;
    font-family: 'ge-medium';
    margin-top: 5px;
}


.offers-top .o-img {
    min-width: 227px;
    height: 150px;
}

.offers-top .o-img img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.offers-medium {
    margin-bottom: 60px;
}

.offers-medium .inner {
    background-color: #fff;
    box-shadow: 0 0 4px rgb(0 0 0 / 16%);
    display: flex;
    align-items: center;
    height: 174px;
    position: relative;
    border-radius: 4px;
}

.offers-medium .inner .i-img {
    min-width: 185px;
    width: 185px;
    position: relative;
    border-radius: 0 4px 4px 0;
    height: 260px;
    object-fit: cover;
}

.offers-medium .inner .i-img span {
    font-family: 'metro-bold';
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
    width: 98px;
    height: 98px;
    border-radius: 100%;
    background-color: #FDE100;
    text-align: center;
    font-size: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 15px;
    flex-direction: column;
    position: absolute;
    left: -46px;
    top: 50%;
    transform: translateY(-50%);
}

.offers-medium .inner .i-img span i {
    width: 100%;
    font-style: normal;
    font-size: 25px;
    font-family: inherit;
    line-height: 0;
}

.offers-medium .inner .i-data {
    flex-grow: 1;
    position: relative;
    height: 174px;
    padding: 30px 80px 30px 15px;
    z-index: 3;
}

.offers-medium .inner .i-data button {
    width: 37px;
    height: 34px;
    background-color: rgb(193 198 200 / 27%);
    border-radius: 100%;
    position: absolute;
    left: 15px;
    top: 15px;
}

.offers-medium .inner .i-data h4 {
    font-size: 16px;
    color: #34125B;
    font-family: 'ge-medium';
    margin: 20px 0;
}

.offers-medium .inner .i-data div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.offers-medium .inner .i-data span {
    font-family: 'metro-medium';
    color: #636A6B;
    font-size: 14px;
}

.offers-medium .inner::before {
    content: '';
    border: 1px dashed #707070;
    position: absolute;
    left: 6px;
    top: 6px;
    border-radius: 4px;
    right: 6px;
    bottom: 6px;
    z-index: 2;
}

.offers-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.offers-bottom h3 {
    font-size: 24px;
    font-family: 'ge-bold';
    color: #34125B;
}

.offers-bottom p {
    font-family: 'ge-medium';
    color: #34125B;
    margin: 10px 0 0;
}

.offers-bottom img {
    width: 230px;
    height: 150px;
    min-width: 230px;
    border-radius: 4px;
    object-fit: cover;
}

.offers-img {
    height: 726px;
    object-fit: cover;
}

.offers-img img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
