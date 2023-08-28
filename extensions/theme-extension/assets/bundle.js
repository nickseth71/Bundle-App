document.querySelectorAll('.item-bundle-products .item-show-hide').forEach(function(ssss){
    ssss.addEventListener('click',function(){
       console.log('sdsdsd'); 
        console.log(this.parentNode.classList);
        if(this.parentNode.classList.contains('active')){
            this.parentNode.classList.remove("active");
        }else{
           this.parentNode.classList.add("active"); 
        }
    });
});