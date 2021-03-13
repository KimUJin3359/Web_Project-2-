<template>
<div class="main-wrapper">
    <Form class="main-content"/>
    <bar-chart class="main-content" v-if="chartData" :chart-data="chartData"/>
</div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import BarChart from '../components/ReactiveBarChart';
import Form from '../components/Form';
export default {
    title: 'GRAPH',
    components:{
        BarChart,
        Form
    },
    data() {
        return {
            // chartData: null
        }
    },
    // mapState는 computed에서 가져옴
    computed: {
        ...mapState(['chartData'])
    },
    methods: {
        // this.$store.dispatch로도 호출 가능
        ...mapActions(["generateChartData"]),
    },
    async mounted() {
        // this.generateData();
        // setInterval(this.generateChartData, 2000);
        this.generateChartData();
    }
}
</script>

<style>
.main-wrapper {
    display: flex;
    justify-content: space-around;
}

.main-content {
    flex: 1;
    max-width: 700px;
}
</style>