package pt.ubi.di.pdm;

import androidx.appcompat.app.AppCompatActivity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private Dialog CriarJogador, Joga;
    private TextView TV_JogadorNivel, TV_PB, TV_PE;
    private SharedPreferences sharedPreferences, SH_Jogador;
    private RadioButton RB_Baralhado, RB_Escondido, RB_5, RB_10, RB_15;
    private int lvl = 0;
    private EditText ET_NomeJogador;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        CriarJogador = new Dialog(this);
        Joga = new Dialog(this);

        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        SH_Jogador = getSharedPreferences("BD", Context.MODE_PRIVATE);

        TV_PB = findViewById(R.id.TV_PB);
        TV_PB.setText(SH_Jogador.getString("PB", ""));
        TV_PE = findViewById(R.id.TV_PE);
        TV_PE.setText(SH_Jogador.getString("PE", ""));
        TV_JogadorNivel = findViewById(R.id.TV_JogadorNivel);

        //Condição para o Popup do nome aparecer apenas no primeiro inicio da aplicação
        if(sharedPreferences.getBoolean("FIRST_TIME",true)){
            ShowPopUp();
            sharedPreferences.edit().putBoolean("FIRST_TIME", false).apply();
        }
        TV_JogadorNivel.setText(SH_Jogador.getString("Nome", "") + " " + "(" + SH_Jogador.getString("Lvl", "")+ ")");

        Button Jogar = findViewById(R.id.Btn_Jogar);
        Jogar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ShowPopUpJogo();
            }
        });
    }

    //Popup para colocar o nome do utilizador
    private void ShowPopUp(){
        CriarJogador.setContentView(R.layout.pop_up_window);

        ET_NomeJogador = CriarJogador.findViewById(R.id.ET_Nome);

        Button Btn_Criar = CriarJogador.findViewById(R.id.Btn_Criar);
        Btn_Criar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SH_Jogador.getString("Nome", "");
                SharedPreferences.Editor editor = SH_Jogador.edit();
                editor.putString("Nome", ET_NomeJogador.getText().toString());
                editor.apply();

                SH_Jogador.getString("PE", "");
                SharedPreferences.Editor editor3 = SH_Jogador.edit();
                editor3.putString("PE", "0");
                editor3.apply();

                SH_Jogador.getString("PB", "");
                SharedPreferences.Editor editor4 = SH_Jogador.edit();
                editor4.putString("PB", "0");
                editor4.apply();

                SH_Jogador.getString("Lvl", "");
                SharedPreferences.Editor editor1 = SH_Jogador.edit();
                editor1.putString("Lvl", String.valueOf(lvl));
                editor1.apply();

                TV_JogadorNivel.setText(SH_Jogador.getString("Nome", "") + " " + "(" + SH_Jogador.getString("Lvl", "")+ ")");

                CriarJogador.dismiss();
            }
        });
        CriarJogador.show();
    }

    //Popup para colocar as definicoes do jogo
    private void ShowPopUpJogo(){
        Joga.setContentView(R.layout.pop_up_jogo);

        RB_Baralhado = Joga.findViewById(R.id.RB_Normal);
        RB_Escondido = Joga.findViewById(R.id.RB_Escondido);
        RB_5 = Joga.findViewById(R.id.RB_5);
        RB_10 = Joga.findViewById(R.id.RB_10);
        RB_15 = Joga.findViewById(R.id.RB_15);

        Intent Janela = new Intent(MainActivity.this, Janela_Jogo.class);

        Button Jogar = Joga.findViewById(R.id.Btn_Jogo);
        Jogar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(RB_Baralhado.isChecked()){
                    //Caso queira implementar dificuldade, tendo em conta o aumento do nível do utilizador
                    /*
                    if(Integer.parseInt(SH_Jogador.getString("Lvl", "")) < 10){
                        Janela.putExtra("Data", "DataBaralhado.xml");
                    }else{
                        Janela.putExtra("Data", "OutroFicheiro.xml");
                    }
                    */
                    Janela.putExtra("Data", "DataBaralhado.xml");
                    if(RB_5.isChecked()){
                        Janela.putExtra("Quantidade", "4");
                        startActivity(Janela);
                    }
                    else if(RB_10.isChecked()){
                        Janela.putExtra("Quantidade", "9");
                        startActivity(Janela);
                    }
                    else if(RB_15.isChecked()){
                        Janela.putExtra("Quantidade", "14");
                        startActivity(Janela);
                    }
                    else Toast.makeText(MainActivity.this, "Por favor selecione um número", Toast.LENGTH_SHORT).show();
                }else if(RB_Escondido.isChecked()){
                    //Caso queira implementar dificuldade, tendo em conta o aumento do nível do utilizador
                    /*
                    if(Integer.parseInt(SH_Jogador.getString("Lvl", "")) < 10){
                        Janela.putExtra("Data", "DataEscondido.xml");
                    }else{
                        Janela.putExtra("Data", "OutroFicheiro.xml");
                    }
                    */
                    Janela.putExtra("Data", "DataEscondido.xml");
                    if(RB_5.isChecked()){
                        Janela.putExtra("Quantidade", "4");
                        startActivity(Janela);
                    }
                    else if(RB_10.isChecked()){
                        Janela.putExtra("Quantidade", "9");
                        startActivity(Janela);
                    }
                    else if(RB_15.isChecked()){
                        Janela.putExtra("Quantidade", "14");
                        startActivity(Janela);
                    }
                    else Toast.makeText(MainActivity.this, "Por favor selecione um número", Toast.LENGTH_SHORT).show();
                } else Toast.makeText(MainActivity.this, "Por favor selecione um modo", Toast.LENGTH_SHORT).show();

            }
        });
        Joga.show();
    }
}