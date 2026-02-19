import NetInfo from '@react-native-community/netinfo';

class NetworkService {
  async isConnected(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return Boolean(
      state.isConnected &&
      state.isInternetReachable !== false
    );
  }
}

export const networkService = new NetworkService();
