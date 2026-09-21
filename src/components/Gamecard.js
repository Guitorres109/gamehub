import { View, Text, Image, Pressable, StyleSheet } from "react-native"

// Navegção programatica
import { useRouter } from "expo-router"

import { cores } from "../data/tema"

export default function Gamecard ({jogo}){
    const router = useRouter();

    return(<>
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/jogos/${jogo.id}`)} 
        >
            <Image source={jogo.imagem} style={styles.imagem}/>
            <View style={styles.info}>
                <Text style={styles.nome} numberOfLines={1}>
                    {jogo.nome}
                </Text>
                <Text style={styles.genero}>{jogo.genero}</Text>
                <Text style={styles.nota}>⭐ {jogo.nota}</Text>
            </View>
        </Pressable>
    </>)
}

const styles = StyleSheet.create({
  
});
