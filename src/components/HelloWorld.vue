<template>
  <div class="hello">
    <div class="hell_top">
      <img src="../assets/t2.png" style="width: 22px;height: 20px;" @click="add">
      <span style="font-size: 17px;font-weight: 900;">我的足迹记录</span>
      <img src="../assets/t1.png" style="width: 23px;height: 32px;" @click="del">
    </div>
    <div class="top_t">
      <img src="../assets/t3.png" style="width: 60%;;height: 100%;">
    </div>
    <div class="top_three" @click="showNum = true">
      <div>
        <span>累计导航 <span class="three_text">{{ Num01 }}</span> 公里 <span class="three_text">{{ Num02 }}</span> 轨迹</span> <img src="../assets/t4.png" style="width: 55px;;height: 28px;position: relative;top: 5px;">
      </div>
    </div>
    <div class="riqi" align="left" @click="showrq = true">
      {{ riteme }}
    </div>
    <div class="hezi">
      <div class="da_hezi" v-for="(item,index) in Data" :key="index" @click="handlerIndex(item,index)">
          <div style="width: 100%;" class="hezi_top">
            <img v-if="item.walk" src="../assets/t5.png" style="width: 55px;height: 22px;margin-right: 5px;">
            <img v-else src="../assets/t6.png" style="width: 55px;height: 22px;margin-right: 5px;">
            <span>{{ item.date }} {{ item.time }}</span>
            <el-divider direction="vertical" />
            <img src="../assets/t7.png" style="width: 18px;height: 18px;margin-right: 5px;">
             <span> {{ item.km>=1000 ?(item.km*0.001).toFixed(1) : item.km}}{{ item.km>=1000 ? '公里' : '米' }}</span>
            <img v-if="!item.walk" src="../assets/t10.png" style="width: 45px;height: 20px;position: absolute;right: 10px;">

          </div>
          <el-divider  />
          <div class="hezi_bottom">
            <img src="../assets/t8.png" style="width: 18px;height: 51px;margin: 5px 0px;">
            <div class="bottom_zyf">
              <div >{{ item.lutu1 }}</div>
              <div class="zyf_dw">{{ item.lutu2 }}</div>
            </div>
            <img src="../assets/t9.png" style="width: 18px;height: 51px;">

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
    </van-popup>
    <!-- top日期月份 -->
    <van-popup v-model:show="showrq" position="bottom">
        <van-date-picker
          @confirm="onriqi" :columns-type="['year', 'month']" @cancel="showrq = false"
        />
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
  const Data = ref([])
  const show = ref(false)
  const riteme = ref('2024年7月')
  const Index = ref(undefined)
  const showPicker =ref(false)
  const showPickertime =ref(false)
  const showrq =ref(false)
  const showNum = ref(false)
  const Num01 = ref(3708)
  const Num02 = ref(370)
  const from =ref({
    walk:false,
    time:'',
    date:'',
    km:0,
    lutu1:'',
    lutu2:''
  })
  function onriqi ({ selectedValues }){
    riteme.value = selectedValues.join('年')+'月';
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
  function handlerIndex(item,index){
    show.value = true
    from.value = item
    Index.value = index
  }
  function add(){
    Data.value.push({
      walk:true,   //true:步行，false驾车
      date:'07月25日',
      time:'19:19',
      km:4666,
      lutu1:'深圳市宝安区广深路西乡段350-2号',
      lutu2:'广汽埃安深圳航城体验中心'
    })
  }
  function del(){
    if(Data.value.length<=1) return false
    Data.value.splice(Data.value.length-1,1)
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hell_top{
  width: 100%;
  height: 50px;
  display: flex;
  color: #fafefd;
    align-items: center;
    justify-content: space-around;
    letter-spacing: 3px;
}
.top_t{
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
}
.top_three{
  padding: 0 20px;
  margin: 20px 0px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px;
}
.top_three>div{
    height: 100%;
    background-color: #23334c;
    border-radius: 8px;
    padding: 10px;
    color: #fafefd;
    font-weight: 400;
  }
  .three_text{
    font-size: 28px !important;
    color: #64f4ff;
    letter-spacing: 1px;
  }
  .riqi{
    color: #fafefd;
    font-weight: 600;
    margin: 20px;
    margin: 40px 0px 10px 20px;
  }
  .hezi{
  padding: 0 20px;
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
    font-weight: 100;
  }
  .el-divider--vertical{
    border-color: #394962;
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
    font-size: 14px;
    font-weight: 100;
    letter-spacing: 0.5px;
    /* display: flex;
    align-content: space-between;
    flex-wrap: wrap; */
  }
  .zyf_dw{
    position: absolute;
    bottom: 5px;
  }
  .da_hezi{
    position: relative;
    margin-bottom: 10px;
  }
</style>
