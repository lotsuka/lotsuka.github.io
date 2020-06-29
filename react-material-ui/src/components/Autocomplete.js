/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const filter = createFilterOptions();

/*export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
                year: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              year: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={top100Films}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.title}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Free solo dialog" variant="outlined" />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) => setDialogValue({ ...dialogValue, title: event.target.value })}
              label="title"
              type="text"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) => setDialogValue({ ...dialogValue, year: event.target.value })}
              label="year"
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
*/

const options = [
    'Acordo - Débito',
    'Acordo - Judicial',
    'Acordo - Trabalhista',
    'Bonificação natalina',
    'Cartão - Controle de acesso',
    'Deficit Orçamentário - Resp. Proprietário',
    'Despesas - Extras',
    'Documentação/Laudo',
    'Fundo - AVCB',
    'Fundo - Benfeitorias',
    'Fundo - Estacionamento - Manutenção',
    'Fundo - Inadimplência',
    'Fundo - Indenização',
    'Fundo - Investimentos',
    'Fundo - Melhorias',
    'Fundo - Obras',
    'Fundo - Provisões',
    'Fundo de Reserva',
    'Fundo Obras - Complementar',
    'Fundo Reserva - Complementar',
    'Fundo Reserva - Garagem',
    'Imposto - Energia / Água',
    'Imposto - IPTU',
    'Imposto - IPTU - 2016',
    'Imposto - IPTU - 2017',
    'Imposto - IPTU - 2018',
    'Imposto - IPTU - Subsolo / Garagem',
    'Imposto - IPTU - Terreno',
    'Imposto sobre serviços de condomínio (ISS)',
    'Individualização - Água',
    'Individualização - Energia',
    'Individualização - Gás',
    'Instalação - Medidores',
    'Instalação - Sistema de Segurança',
    'Investimentos iniciais',
    'ISS - Imposto sobre serviços de condomínio',
    'Multa - Infração regulamentar',
    'Pintura',
    'Rateio - Aquisição / Instalação de Equipamentos',
    'Rateio - Extra - Serviço / Obra',
    'Rateio - Obras',
    'Rateio Obras - Complementar',
    'Reforma - Elevador',
    'Reforma - Fachada',
    'Reforma - Impermeabilização',
    'Reforma - Tubulação',
    'Reparo - Elétrico',
    'Reparo - Hidráulico',
    'Sistema Monitoramento/Segurança',
    'Taxa municipal - Coleta de Lixo',
    'Uso - Churrasqueira',
    'Uso - Lavanderia',
    'Uso - Serviço Condomínio',
];

const useStyles = makeStyles({
  root: {
  }
});

export default function ControllableStates() {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    const classes = useStyles();

    return (
        <div>
            <Typography variant="Subheading" color="inherit">
                        Selecione a despesa
                    </Typography>
            <p>Qual nome mais se aproxima do que está escrito no boleto?</p>
            
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValue(newValue);
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValue({
                        title: newValue.inputValue,
                      });
                    } else {
                      setValue(newValue);
                    }
                  }}

                  
                  
                  
                  

                inputValue={inputValue}
                noOptionsText="Não achei a despesa na lista"

                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}


                id="controllable-states-demo"
                options={options}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
            />
        </div>
    );
}

/* filterOptions={(options, params) => {
                    const filtered = filter(options, params);
          
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                      });
                    }
          
                    return filtered;
                  }}

                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }

                    // Regular option
                    return option.title;
                  }}
 */