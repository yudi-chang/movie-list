<template>
  <div class="contact-page">
    <div class="contact-container animate enter">
      <div class="image-wrapper">
        <img src="/images/profile-picture.png" alt="Cart" />
      </div>
      <div class="contact-info">
        <h1 class="text-3xl fw-bold">M. Yudi Chang</h1>
        <h3 class="text-xl fw-bold">Frontend Developer</h3>
        <p class="text-sm">
          <a href="mailto:m.yudi.chang@gmail.com">m.yudi.chang@gmail.com</a>
        </p>
        <p class="text-sm">
          <a href="https://www.linkedin.com/in/yudi-chang/" target="_blank" rel="noopener noreferrer">
            https://www.linkedin.com/in/yudi-chang/
          </a>
        </p>
        <p class="text-sm">
          <a href="tel:+6289686211228">+6289686211228</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: calc(100vh - 52px);
}

.contact-container {
  width: 750px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: 0px 10px 15px 10px rgb(0 0 0 / 15%);
  background-color: rgb(228 228 228 / 15%); 
  border-radius: 10px;

  * {
    color: $secondary-color;
  }

  .image-wrapper {
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .contact-info {
    padding-left: 50px;

    h1 {
      margin-bottom: 12px;
    }

    h3 {
      margin-bottom: 8px;
    }

    p {
      margin-bottom: 4px;

      a {
        color: #1abc9c;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .contact-container {
    width: calc(100% - 50px);
    display: block;
    padding: 30px 20px;

    .image-wrapper {
      margin: 0 auto;
    }
    
    .contact-info {
      margin-top: 25px;
      text-align: center;
      display: block;
      padding: 0;

      h3 {
        margin-bottom: 15px;
      }

      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>