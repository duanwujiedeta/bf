<template>
  <div>
    This is a house
  </div>
  <Teleport to="#sky">
    <div>Sky and clouds</div>
  </Teleport>
</template>

<template>
  <section id="sky" />  <!-- 下方的 House 组建内的 Teleport将会作用到sky来 -->
  <section class="wrapper">
    <House />
  </section>
</template>