import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, IconButton, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use o ícone da biblioteca que preferir
import { getAllMembers, deleteUser } from '../../service/ServiceUtil';
import { useAuth } from '../../components/auth/AuthProvider';

const UsersInformation = () => {
    const [users, setUsers] = useState([]);
    const { isAdmin } = useAuth()


    useEffect(() => {
        if (isAdmin()) {
            fetchUsers();
        } else {
            console.error("You shouldn't be here!!");
        }
    }, []);

    async function fetchUsers() {
        try {
            const  members = await getAllMembers();

            setUsers(members);
        } catch (error) {
            console.error('Error obtaining users:', error);
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            console.log('Usuário excluído com sucesso.');
            await fetchUsers();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
            List all members
          </Text>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <Card key={index} style={{ marginVertical: 5 }}>
                  <List.Item
                    title={user.email}
                    right={() => (
                      <IconButton
                        icon={() => (
                          <Icon name="trash" size={20} color="red" />
                        )}
                        onPress={() => handleDeleteUser(user.id)}
                      />
                    )}
                  />
                </Card>
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </ScrollView>
        </View>
      );
};

export default UsersInformation;
