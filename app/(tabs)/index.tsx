import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useIncidents } from '../../hooks/useIncidents';
import { useFavorites } from '../../hooks/useFavorites';

export default function IncidentsScreen() {
  const { incidents, loading, error } = useIncidents();
  const { favorites, toggle, isFav } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Debug logging
  console.log('[INCIDENTS_SCREEN] Component rendered:', {
    incidentsCount: incidents.length,
    loading,
    error,
    hasFireIncidents: incidents.filter(i => i.category.toLowerCase().includes('fire')).length
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // The real-time listener will automatically refresh data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleToggleFavorite = (incidentId: string) => {
    toggle(incidentId);
  };

  const getTypeColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'fire': 
      case 'structure fire': 
        return '#FF3B30';
      case 'accident': 
      case 'vehicle accident': 
      case 'traffic': 
        return '#FF9500';
      case 'medical': 
      case 'medical emergency': 
      case 'health': 
        return '#FF2D92';
      case 'hazmat': 
      case 'chemical': 
      case 'hazmat incident': 
        return '#5856D6';
      case 'rescue': 
      case 'water rescue': 
      case 'water': 
        return '#007AFF';
      case 'security': 
      case 'crime': 
        return '#AF52DE';
      case 'weather': 
      case 'natural disaster': 
        return '#FF8C00';
      default: return '#8E8E93';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#FFD60A';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return '#FF3B30';
      case 'investigating': return '#FF9500';
      case 'resolved': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const renderAlert = ({ item }: { item: any }) => {
    const formattedTime = item.timestamp instanceof Date 
      ? item.timestamp.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'Unknown time';
    
    const isItemFavorite = isFav(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.alertCard}
        onPress={() => router.push(`/incident/${item.id}`)}
      >
        <View style={styles.alertHeader}>
          <Text style={styles.timestamp}>{formattedTime}</Text>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => handleToggleFavorite(item.id)}
          >
            <Ionicons 
              name={isItemFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isItemFavorite ? "#FF3B30" : "#8E8E93"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.alertLocation}>
          <Text style={styles.locationText}>{item.location || 'Location unknown'}</Text>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
            <Text style={styles.severityText}>{item.severity?.toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.alertType}>
          <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.category) }]} />
          <Text style={[styles.typeText, { color: getTypeColor(item.category) }]}>
            {item.category}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status?.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.address}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        {item.affectedAreas && item.affectedAreas.length > 0 && (
          <Text style={styles.affectedAreas}>
            Affected: {item.affectedAreas.join(', ')}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NFA Alerts</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Error handling */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading incidents: {error}</Text>
        </View>
      )}

      {/* Loading indicator */}
      {loading && incidents.length === 0 && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading incidents...</Text>
        </View>
      )}

      {/* No incidents message */}
      {!loading && !error && incidents.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="information-circle-outline" size={48} color="#8E8E93" />
          <Text style={styles.emptyText}>No incidents available</Text>
          <Text style={styles.emptySubtext}>Pull to refresh and check for new alerts</Text>
        </View>
      )}

      {/* Incidents List */}
      <FlatList
        data={incidents}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, incidents.length === 0 && { flex: 1 }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48, // Account for status bar
  },
  searchButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
  },
  listContent: {
    paddingVertical: 8,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  favoriteButton: {
    padding: 4,
  },
  alertLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  distanceText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  alertType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  affectedAreas: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FFE5E5',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
});