package pt.ubi.di.pdm;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ExpandableListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class Janela_Jogo extends AppCompatActivity {

    private SharedPreferences SH_Jogador;
    private int pontuacao = 0, certo = 0, errado = 0, count = 0, index = 0, pont = 0, lvl = 0;
    private EditText ET_Resposta;
    private TextView TV_Frases, TV_Pontuacao, TV_Certo, TV_Errado, TV_Autor, TV_Pont;
    private Element element;
    private Dialog Final;
    private String DataFile, Quantidade;
    private List<Integer> ListRandom = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_janela_jogo);

        SH_Jogador = getSharedPreferences("BD", Context.MODE_PRIVATE);

        DataFile = getIntent().getStringExtra("Data"); //Ficheiro a utilizar
        Quantidade = getIntent().getStringExtra("Quantidade"); //Quantidade de frases

        TV_Errado = findViewById(R.id.TV_Errado);
        TV_Errado.setText("Erradas: " + errado);
        TV_Certo = findViewById(R.id.TV_Certo);
        TV_Certo.setText("Certas: " + certo);
        TV_Pontuacao = findViewById(R.id.TV_Pontuacao);
        TV_Pontuacao.setText("Pontuação: " + pontuacao);
        TV_Frases = findViewById(R.id.TV_Frases);
        ET_Resposta = findViewById(R.id.ET_Resposta);
        TV_Autor = findViewById(R.id.TV_Autor);

        Final = new Dialog(this);
        NodeList node = GetNodeList(DataFile, "frase");

        //Lista utilizada para baralhar os elementos da base de dados
        for (int i = 0; i < node.getLength(); i++){
            ListRandom.add(i);
        }
        Collections.shuffle(ListRandom);
        //-----------------------------------------------------------

        //Condicão para colocar a primeira frase em cada modo de jogo
        if (DataFile.equals("DataBaralhado.xml")) { TV_Frases.setText(Baralhar(getValue("original", (Element) node.item(ListRandom.get(0))))); }
        else{ TV_Frases.setText(Hide(getValue("original", (Element) node.item(ListRandom.get(0))), getValue("palavra", (Element) node.item(ListRandom.get(0))))); }
        TV_Autor.setText(getValue("autor", (Element) node.item(ListRandom.get(0))));

        Button Seguinte = findViewById(R.id.Btn_Seguinte);
        Seguinte.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(count < Integer.parseInt(Quantidade)) {
                    ClickSeguinte(node);
                    if(count == Integer.parseInt(Quantidade) - 1){
                        Seguinte.setText("Acabar");
                    }
                    count++;
                }
                else{
                    ClickSeguinte(node);
                    TV_Frases.setText("");
                    ShowPopUpFinal();
                }
            }
        });
    }

    private void ClickSeguinte(NodeList node){

        element = (Element) node.item(ListRandom.get(index));
        if(DataFile.equals("DataBaralhado.xml")) {
            if (ET_Resposta.getText().toString().equals(getValue("original", element))) {
                certo++;
                pontuacao = pontuacao + 100;
                TV_Certo.setText("Certas: " + certo);
                TV_Pontuacao.setText("Pontuação: " + pontuacao);
            } else {
                errado++;
                TV_Errado.setText("Erradas: " + errado);
            }
        } else {
            if (ET_Resposta.getText().toString().equals(getValue("palavra", element))) {
                certo++;
                pontuacao = pontuacao + 100;
                TV_Certo.setText("Certas: " + certo);
                TV_Pontuacao.setText("Pontuação: " + pontuacao);
            } else {
                errado++;
                TV_Errado.setText("Erradas: " + errado);
            }
        }

        index++;
        element = (Element) node.item(ListRandom.get(index));

        if (DataFile.equals("DataBaralhado.xml")) { TV_Frases.setText(Baralhar(getValue("original", element))); }
        else{ TV_Frases.setText(Hide(getValue("original", element), getValue("palavra", element))); }

        TV_Autor.setText(getValue("autor", element));
        ET_Resposta.getText().clear();
    }

    private void ShowPopUpFinal(){

        Final.setContentView(R.layout.pop_up_final);

        Intent Jan = new Intent(Janela_Jogo.this, MainActivity.class);

        TV_Pont = Final.findViewById(R.id.TV_Pont);
        TV_Pont.setText(TV_Pontuacao.getText());

        Button Btn_Final = Final.findViewById(R.id.Btn_Final);
        Btn_Final.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // Para calcular o nivel do utilizador
                pont = Integer.parseInt(SH_Jogador.getString("Pont", String.valueOf(pont))) + pontuacao;
                SharedPreferences.Editor editor1 = SH_Jogador.edit();
                editor1.putString("Pont", String.valueOf(pont));
                editor1.apply();

                while( pont > 1000){
                    pont = pont - 1000;
                    lvl = lvl + 1;
                }

                SH_Jogador.getString("Lvl", "");
                SharedPreferences.Editor editor2 = SH_Jogador.edit();
                editor2.putString("Lvl", String.valueOf(lvl));
                editor2.apply();
                //------------------------------------------------------------

                // Para verificar as melhores pontuções de cada modo
                if(DataFile.equals("DataBaralhado.xml")){
                    if(pontuacao > Integer.parseInt(SH_Jogador.getString("PB", ""))){
                        SH_Jogador.getString("PB", "");
                        SharedPreferences.Editor editor3 = SH_Jogador.edit();
                        editor3.putString("PB", String.valueOf(pontuacao));
                        editor3.apply();
                    }
                } else {
                    if(pontuacao > Integer.parseInt(SH_Jogador.getString("PE", ""))){
                        SH_Jogador.getString("PE", "");
                        SharedPreferences.Editor editor3 = SH_Jogador.edit();
                        editor3.putString("PE", String.valueOf(pontuacao));
                        editor3.apply();
                    }
                }
                //------------------------------------------------------------

                startActivity(Jan);
            }
        });

        Button Btn_Share = Final.findViewById(R.id.Btn_Share);
        Btn_Share.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent iSendMsg = new Intent(Intent.ACTION_SEND);
                iSendMsg.putExtra(Intent.EXTRA_TEXT, "A minha pontuação foi: " + pontuacao + " 😀");
                iSendMsg.setType("text/plain");
                startActivity(iSendMsg);
            }
        });
        Final.show();
    }

    private String Baralhar(String str){
        String pronta = "";
        ArrayList<String> Separar = new ArrayList<>();
        while (str.split(" ").length != 1){
            Separar.add(str.split(" ")[0]);
            str = str.substring(str.indexOf(str.split(" ")[1]));
        }
        Separar.add(str);
        Collections.shuffle(Separar);

        for (String index : Separar){
            pronta += " " + index;
        }
        return pronta.substring(1);
    }

    private String Hide(String frase, String palavra){
        String str = "";
        ArrayList<String> List = new ArrayList<>();
        while(frase.split(" ").length > 1){
            if (frase.split(" ")[0].equals(palavra) == false) List.add(frase.split(" ")[0]);
            else List.add("____");
            frase = frase.substring(frase.indexOf(frase.split(" ")[1]));
        }
        List.add(frase);
        for(int index = 0; index < List.size(); index++){
            str = str + " " + List.get(index);
        }
        return str;
    }

    private NodeList GetNodeList(String FileName, String TAG){
        NodeList nList = new NodeList() {
            @Override
            public Node item(int i) {
                return null;
            }

            @Override
            public int getLength() {
                return 0;
            }
        };
        //Abertura do ficheiro XML:
        try {
            InputStream is = getAssets().open(FileName);

            DocumentBuilderFactory dbFatory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFatory.newDocumentBuilder();
            Document doc = dBuilder.parse(is);

            Element element = doc.getDocumentElement();
            element.normalize();

            nList = doc.getElementsByTagName(TAG);
        }   catch (Exception e) { e.printStackTrace(); }
        return nList;
    }

    private static String getValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = (Node) nodeList.item(0);
        return node.getNodeValue();
    }
}