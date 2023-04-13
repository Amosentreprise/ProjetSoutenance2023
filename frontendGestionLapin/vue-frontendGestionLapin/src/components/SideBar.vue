<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="bg-white text-secondary w-64 flex-none ">
      <div class="flex items-center justify-center h-16">
        <span class="text-lg font-bold">{{ nameDashboard}}</span>
      </div>
      <slot name="options"></slot>
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 bg-gray-100">
      <div class="flex justify-between items-center bg-secondary py-4 px-6">
        <div class="flex items-center">
          
          <span class="font-bold text-lg text-white">{{ ActionName }}</span>
        </div>
        <div class="flex items-center">
          <slot name="other"></slot>
        </div>
      </div>
      <div class="p-6">
        <!-- Content goes here -->
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Sidebar',
  props:['nameDashboard', 'ActionName']
}
</script>

<style>
/* Custom styles here */
</style>
