<template>
  <header>
    <RouterLink to="/">
      <h1>PokéDex</h1>
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/style/vars";

header {
  position: relative;

  width: 100%;
  max-width: 1440px;

  z-index: 2;

  @media screen and (min-width: 320px) {
    @include flex-x(space-between, center);
    padding: 24px 24px 0;

    & > a {
      text-decoration: none;
    }

    h1 {
      display: block;
      margin: 0 auto;

      font-size: clamp(36px, 15vw, 60px);
      font-weight: 700;
      text-align: center;
      color: transparent;

      background: var(--theme-gradient-text);
      -webkit-background-clip: text;
      background-clip: text;
    }
    & > .scrolling__menu {
      max-height: 60px;
      height: 60px;

      cursor: pointer;
      transition: max-height 0.5s ease-in-out;
    }

    &.content-scrolling {
      h1,
      .scrolling__menu {
        max-height: 50px;
        font-size: clamp(24px, 7.5vw, 48px);

        transition: all 0.5s ease-in-out;
      }
    }
  }

  @media screen and (min-width: 600px) {
    padding: 20px 20px 0;
  }

  @media screen and (min-width: 1490px) {
    padding: 20px 0 0;
  }

  @media screen and (min-width: 2500px) {
    max-width: 1600px;
  }
}
</style>
