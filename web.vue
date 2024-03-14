<template>
  <div>
    <div>
      <label for="name"
        >Name:
        <input v-model="user.name" placeholder="Enter your name" id="name" />
      </label>
    </div>
    <div>
      <label for="age"
        >Age:
        <input v-model="user.age" placeholder="Enter your age" id="age" />
      </label>
    </div>
  </div>
</template>