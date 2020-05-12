<template>
    <footer class="footer text-center">
        <div class="container">
            <hr>
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-12 col-sm-12">
                    <div class="copyright">
                        &copy; Revive {{year}}. Desenvolvido por
                        <br> 
                        IFCE - Instituto Federal de Educação, Ciência e Tecnologia do Ceará &
                        
                        LAR - Laboratório de Redes de Computadores e Sistemas.
                        <!-- <a href="https://www.creative-tim.com" target="_blank" rel="noopener"></a> & <a href="https://www.binarcode.com" target="_blank" rel="noopener">Binar Code</a> -->
                    </div>
                </div>
                <!--
                <div class="col-md-6 col-sm-6">
                    <ul class="nav nav-footer justify-content-end">
                        <li class="nav-item">
                            <a href="https://ifce.edu.br/" class="nav-link" target="_blank" rel="noopener">IFCE</a>
                        </li>
                        <li class="nav-item">
                            <a href="http://www.lar.ifce.edu.br/" class="nav-link" target="_blank" rel="noopener">LAR</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" target="_blank" rel="noopener">Sobre</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" target="_blank" rel="noopener">Home</a>
                        </li>
                    </ul>
                </div>
                -->
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
