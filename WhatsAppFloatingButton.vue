<!-- WhatsAppFloatingButton.vue -->
<template>
  <div 
    class="whatsapp-floating-button" 
    @click="redirectToWhatsApp"
    :style="positionStyle"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="30" 
      height="30" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M19.17,12.56A1.62,1.62,0,0,1,17.71,12L16.11,10.38a1.63,1.63,0,0,1-.48-1.13l0-1.92a1.64,1.64,0,0,0-1.64-1.64H12a1.64,1.64,0,0,1-1.13-.48L9.29,4.83a1.62,1.62,0,0,0-2.29,0L4.83,7.29a1.62,1.62,0,0,0,0,2.29l1.46,1.46a1.64,1.64,0,0,1,.48,1.13v1.92a1.64,1.64,0,0,0,1.64,1.64H10a1.64,1.64,0,0,1,1.13.48l1.46,1.46a1.62,1.62,0,0,0,2.29,0l2.46-2.46A1.62,1.62,0,0,0,19.17,12.56ZM12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8,8,3.59,8,8S16.41,20,12,20Zm0-18A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'WhatsAppFloatingButton',
  props: {
    phoneNumber: {
      type: String,
      default: '+2290151875012' // Numéro de téléphone par défaut
    },
    message: {
      type: String,
      default: 'Bonjour, je souhaite vous contacter.'
    },
    position: {
      type: Object,
      default: () => ({
        bottom: '20px',
        right: '20px'
      })
    }
  },
  computed: {
    positionStyle() {
      return {
        position: 'fixed',
        bottom: this.position.bottom,
        right: this.position.right,
        zIndex: 1000
      }
    }
  },
  methods: {
    redirectToWhatsApp() {
      const cleanedNumber = this.phoneNumber.replace(/[^\d+]/g, '')
      const encodedMessage = encodeURIComponent(this.message)
      const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
    }
  }
}
</script>

<style scoped>
.whatsapp-floating-button {
  width: 60px;
  height: 60px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.whatsapp-floating-button:hover {
  background-color: #128C7E;
  transform: scale(1.1);
}
</style>