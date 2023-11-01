
$("#botaoEnviarDados").on("click", () => {

    if  (!inputsSaoValidos (event)) return;

    $("#botaoEnviarDados").attr("disable",true);

    const serviceID = "service_oa98bah";
    const templateID = "template_psdnf2r";
    const templateParams = {
        nomeCompleto: $("#inputNome").val(),
        email: $("#inputEmail").val(),
        telefone: $("#inputTelefone").val()
    }

    return emailjs.send(serviceID, templateID, templateParams)
        .then((obj, params) => {
            $("#inputNome").val("");
            $("#inputEmail").val("");
            $("#inputTelefone").val("");

            $("#modalHeader").children("h5").text("Confirmação de Envio de Dados");
            $("#modalBody").children("p").text("Seus dados foram enviados com sucesso. A equipe responsável fará o contato assim que possível.");
            $("#modalFooter").children('button').removeClass("btn-danger").addClass("btn-success");
            return;
        })
        .catch((err) => {
            $("#modalHeader").children("h5").text("Erro no Envio de Dados");
            $("#modalBody").children("p").text("Houve um erro inesperado e seus dados não puderam ser enviados. Por favor, tente novamente mais tarde.");
            $("#modalFooter").children('button').removeClass("btn-success").addClass("btn-danger");
            return;
        })
        .finally(() => {
             $("#modalInscricao").modal();
            return $('#botaoEnviarDados').attr("disable", false);
        });    
});

function inputsSaoValidos (event){
    if (!$('.needs-validation')[0].checkValidity()){
        event.preventDefault();
        event.stopPropagation();
        $('.needs-validation').addClass('was-validated')
        return false;
    }
    $('.needs-validation').removeClass('was-validated')
    return true;
}