  /**
   * function that hide and show subMenu items when clicked
   */
  $(function(){

    if (!!location.href.match(/index/)){

      $('#submenuCarto').removeClass('d-none')
      $('#map').mouseover(function() {

        $('#submenuCarto').removeClass('d-none')
        $('#submenuLRSM').addClass('d-none')
        $('#submenuProjects').addClass('d-none')
        $('#submenuCorpus').addClass('d-none')
      })

      $( "#menuCorpora" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').removeClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $( "#menuProjets" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $('#menuLRSM')
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });


      $( "#menuCarto" )
        .mouseover(function() {

          $('#submenuCarto').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {
          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
         // $('#submenuCarto').removeClass('d-none')
        });

      /*************************************************************************/
       }
    else if (!!location.href.match(/projets/)){
      $('#submenuProjects').removeClass('d-none')
      $('#mainPage').mouseover(function() {

        $('#submenuCarto').addClass('d-none')
        $('#submenuLRSM').addClass('d-none')
        $('#submenuProjects').removeClass('d-none')
        $('#submenuCorpus').addClass('d-none')
      })

      $( "#menuCorpora" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').removeClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $( "#menuProjets" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $('#menuLRSM')
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });


      $( "#menuCarto" )
        .mouseover(function() {

          $('#submenuCarto').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {
          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          // $('#submenuCarto').removeClass('d-none')
        });
    }
    /*************************************************************************/
    else if (!!location.href.match(/corpora/)){
      console.log('corpora')
      $('#submenuCorpus').removeClass('d-none')
      $('#mainPage').mouseover(function() {

        $('#submenuCarto').addClass('d-none')
        $('#submenuLRSM').addClass('d-none')
        $('#submenuProjects').addClass('d-none')
        $('#submenuCorpus').removeClass('d-none')
      })

      $( "#menuCorpora" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').removeClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $( "#menuProjets" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $('#menuLRSM')
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });


      $( "#menuCarto" )
        .mouseover(function() {

          $('#submenuCarto').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {
          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          // $('#submenuCarto').removeClass('d-none')
        });
    }
    /*************************************************************************/
    else if (!!location.href.match(/apropos/)){
      console.log('apropos')
      $('#submenuLRSM').removeClass('d-none')
      $('#mainPage').mouseover(function() {

        $('#submenuCarto').addClass('d-none')
        $('#submenuLRSM').removeClass('d-none')
        $('#submenuProjects').addClass('d-none')
        $('#submenuCorpus').addClass('d-none')
      })

      $( "#menuCorpora" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').removeClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $( "#menuProjets" )
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').removeClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });

      $('#menuLRSM')
        .mouseover(function() {

          $('#submenuCarto').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {

          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').removeClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCarto').addClass('d-none')
        });


      $( "#menuCarto" )
        .mouseover(function() {

          $('#submenuCarto').removeClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          $('#submenuCorpus').addClass('d-none')
        })
        .mouseout(function() {
          $('#submenuCorpus').addClass('d-none')
          $('#submenuLRSM').addClass('d-none')
          $('#submenuProjects').addClass('d-none')
          // $('#submenuCarto').removeClass('d-none')
        });
    }
    else {
      console.log('no match')
    }
  })
