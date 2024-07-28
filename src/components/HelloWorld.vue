<template>
  <div class="hello">
    <div align="center">
      <img src="../assets/t11.png" style="width: 55px;height: 16px;">
    </div>
    <div class="hell_top">
      <img src="../assets/t2.png" style="width: 20px;height: 18px;position: relative;left: -20px;" @click="add">
      <span style="font-size: 17px;font-weight: 900;" @click="requestFullScreen">我的足迹记录</span>
      <img src="../assets/t1.png" style="width: 22px;height: 30px;position: relative;left: 25px;" @click="shanchu">
    </div>
    <div class="top_t">
      <img src="../assets/t3.png" style="width: 60%;;height: 100%;">
    </div>
    <div class="top_three" @click="showNum = true">
      <div>
        <span>累计导航 <span class="three_text">{{ Num01 }}</span> 公里 <span class="three_text">{{ Num02 }}</span> 轨迹</span> <img src="../assets/t4.png" style="width: 55px;;height: 28px;position: absolute;top:20px;right: 20px;">
      </div>
    </div>
    <div class="zonghezi">
    <div v-for="(v,i) in ArrData" :key="i"> 
    <div class="riqi" align="left" @click="riqixinzeng(i)">
      {{ v.riteme }}
    </div>
    <div class="hezi">
      <div class="da_hezi" v-for="(item,index) in v.Data" :key="index" @click="handlerIndex(item,index,i)">
          <div style="width: 100%;" class="hezi_top">
            <img v-if="item.walk" src="../assets/t5.png" style="width: 51px;height: 20px;margin-right: 5px;">
            <img v-else src="../assets/t6.png" style="width: 51px;height: 20px;margin-right: 5px;">
            <span>{{ item.date }} {{ item.time }}</span>
            <el-divider direction="vertical" />
            <img src="../assets/t7.png" style="width: 16px;height: 16px;margin-right: 1px;">
             <span> {{ item.km>=1000 ?(item.km*0.001).toFixed(1) : item.km}}{{ item.km>=1000 ? '公里' : '米' }}</span>
            <img v-if="item.cbp" src="../assets/t10.png" style="width: 40px;height: 19px;position: absolute;right: 10px;">

          </div>
          <el-divider  />
          <div class="hezi_bottom">
            <img src="../assets/t8.png" style="width: 17px;height: 48px;">
            <div class="bottom_zyf">
              <div class="zyf_dw1">{{ item.lutu1 }}</div>
              <div class="zyf_dw">{{ item.lutu2 }}</div>
            </div>
            <img src="../assets/t9.png" style="width: 17px;height: 48px;">

          </div>
      </div>
    </div>
  </div>
</div>
    <van-popup v-model:show="show" round closeable position="bottom" :style="{ width: '100%' }">
      <van-field name="radio" label="步行/驾车">
        <template #input>
          <van-radio-group v-model="from.walk" direction="horizontal">
            <van-radio :name="true">步行</van-radio>
            <van-radio :name="false">驾车</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="错必赔">
        <template #input>
          <van-radio-group v-model="from.cbp" direction="horizontal">
            <van-radio :name="true">显示</van-radio>
            <van-radio :name="false">不显示</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="from.date"
        is-link
        readonly
        label="日期选择"
        placeholder="点击选择日期"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker :columns-type="['month', 'day']" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    <van-field
        v-model="from.time"
        is-link
        readonly
        label="时间选择"
        placeholder="点击选择时间"
        @click="showPickertime = true"
      />
      <van-popup v-model:show="showPickertime" position="bottom">
        <van-time-picker
          @confirm="onConfirmtime" @cancel="showPickertime = false"
          :formatter="formatter"
        />
      </van-popup>
      <van-field
        v-model="from.km"
        label="米数"
        placeholder="请输入米数(1公里=1000米换算)"
      />
      <van-field
        v-model="from.lutu1"
        label="地址1"
        placeholder="请输入地址1"
      />
      <van-field
        v-model="from.lutu2"
        label="地址2"
        placeholder="请输入地址2"
      />
      <van-button style="width: 100%;" type="danger" @click="del()">删除</van-button>
    </van-popup>
    <!-- top日期月份 -->
    <van-popup v-model:show="showrq" position="bottom">
        <van-date-picker
          @confirm="onriqi" :columns-type="['year', 'month']" @cancel="showrq = false"
        />
        <van-button style="width: 100%;" type="primary" @click="handleadd()">添加行程</van-button>
    </van-popup>
    <!-- top公里数轨迹 -->
    <van-popup v-model:show="showNum" position="bottom">
      <van-field
        v-model="Num01"
        label="总公里数"
        placeholder="请输入总公里数(四位数)"
      />
      <van-field
        v-model="Num02"
        label="轨迹数"
        placeholder="请输入轨迹数(三位数)"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
  const show = ref(false)
  const Index = ref(undefined)
  const Index1 = ref(undefined)
  const showPicker =ref(false)
  const showPickertime =ref(false)
  const showrq =ref(false)
  const showNum = ref(false)
  const Num01 = ref(9793)
  const Num02 = ref(370)
  const ArrData = ref([]) //外层
  const from =ref({
    walk:false,
    cbp:false,
    time:'',
    date:'',
    km:0,
    lutu1:'',
    lutu2:''
  })
            function requestFullScreen() {

          var de = document.documentElement;

          if (de.requestFullscreen) {

          de.requestFullscreen();

          } else if (de.mozRequestFullScreen) {

          de.mozRequestFullScreen();

          } else if (de.webkitRequestFullScreen) {

          de.webkitRequestFullScreen();

          }

          }
    //删除日期
    function shanchu(){
      if(ArrData.value.length<=1) return false
      ArrData.value.splice(ArrData.value.length-1,1)
    }
    //添加行程
    function handleadd(){
      ArrData.value[Index1.value].Data.push(
        {
          walk:true,   //true:步行，false驾车
          cbp:false, //错必赔图标
          date:'07月25日',
          time:'19:19',
          km:4666,
          lutu1:'深圳市宝安区广深路西乡段350-2号',
          lutu2:'广汽埃安深圳航城体验中心'
        })
    }
    //新增行程
    function riqixinzeng(index){
      showrq.value = true
      Index1.value = index
  }
  function onriqi ({ selectedValues }){
    console.log(ArrData.value[Index1.value]);
    ArrData.value[Index1.value].riteme = selectedValues.join('年')+'月';
    showrq.value = false;
  }
  const formatter = (type, option) => {
      if (type === 'hour') {
        option.text += '时';
      }
      if (type === 'minute') {
        option.text += '分';
      }
      return option;
    };
  function onConfirmtime({ selectedValues }){//时间选择
    from.value.time = selectedValues.join(':');
    showPickertime.value = false;
    console.log(from.value.time,selectedValues);
  }
  function onConfirm({ selectedValues }){//日期选择
    from.value.date = selectedValues.join('月')+'日';
      showPicker.value = false;
    console.log(from.value.date);
  }
  function handlerIndex(item,index,index1){
    show.value = true
    from.value = item
    Index.value = index
    Index1.value = index1
  }
  function add(){
    ArrData.value.push({
      riteme:'2024年07月',
      Data:[{
        walk:true,   //true:步行，false驾车
        cbp:false, //错必赔图标
        date:'07月25日',
        time:'19:19',
        km:4666,
        lutu1:'深圳市宝安区广深路西乡段350-2号',
        lutu2:'广汽埃安深圳航城体验中心'
      }]
    })
    
  }
  function del(){
    if(ArrData.value[Index1.value].Data.length<=1) return false
    ArrData.value[Index1.value].Data.splice(Index.value,1)
    show.value = false
  }
  // requestFullScreen()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zonghezi{
  width: 100%;
  height: 75vh;
  overflow-x: auto;
}
.hell_top{
  width: 100%;
  height: 50px;
  display: flex;
  color: #fafefd;
    align-items: center;
    justify-content: space-around;
    letter-spacing: 1px;
}
.top_t{
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
}
.top_three{
  padding: 0 10px;
    margin: 15px 0px 40px 0px;
    width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px;
  position: relative;

}
.top_three>div{
    height: 100%;
    text-align: left;
    background-color: #23334c;
    border-radius: 8px;
    padding: 15px 10px;
    color: #fafefd;
  font-weight: 600;
}
  .three_text{
    font-size: 28px !important;
    font-family: 'Bahnschrift', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #64f4ff;
    letter-spacing: -1px;
    font-weight: 500;
  }
  .riqi{
    color: #fafefd;
    font-weight: 600;
    font-size: 14px;
    margin: 15px 0px 10px 10px;
  }
  .hezi{
  padding: 0 10px;
  margin: 10px 0px;
  width: 100%;
  box-sizing: border-box;
}
.hezi>div{
    height: 100%;
    background-color: #23334c;
    border-radius: 8px;
    padding: 10px;
  }
  .hezi_top{
    display: flex;
    color: #c0d0e9;
    font-size: 12px;
    /* letter-spacing: 1px; */
    align-items: center;
    font-weight: 400;
  }
  .el-divider--vertical{
    border-color: #394962;
    margin: 0 5px;
  }
  .el-divider--horizontal{
    margin: 10px 0;
    border-color: #394962;
  }
  .hezi_bottom{
    display: flex;
    width: 100%;
    color: #fdfcf7;
    justify-content: space-between;
  }
  .bottom_zyf{
    flex: 1;
    text-align: left;
    position: relative;
    padding-left: 10px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.5px;
    /* display: flex;
    align-content: space-between;
    flex-wrap: wrap; */
  }
  .zyf_dw1{
    position: absolute;
    top: -1px;
  }
  .zyf_dw{
    position: absolute;
    bottom: 0px;
  }
  .da_hezi{
    position: relative;
    margin-bottom: 10px;
  }
</style>
