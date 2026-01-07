import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaginatedNumComp = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const delta = 4; // Number of pages to show on each side of current page
  const pages = [];

  // Always show first page
  pages.push(1);

  const start = Math.max(2, currentPage - delta);
  const end = Math.min(totalPages - 1, currentPage + delta);

  // Add ellipsis if needed after page 1
  if (start > 2) {
    pages.push('...');
  }

  // Add pages around current page
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if needed
  if (end < totalPages - 1) {
    pages.push('...');
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <TouchableOpacity
        onPress={handlePrev}
        disabled={currentPage === 1}
        style={[styles.navButton, currentPage === 1 && styles.disabled]}
      >
        <Text style={styles.navText}>{'<'}</Text>
      </TouchableOpacity>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <View key={`ellipsis-${index}`} style={styles.pageItem}>
              <Text style={styles.ellipsis}>...</Text>
            </View>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <TouchableOpacity
            key={page}
            onPress={() => onPageChange(page)}
            disabled={isCurrent}
          >
            <View style={[styles.pageItem, isCurrent && styles.currentPage]}>
              <Text style={[styles.pageText, isCurrent && styles.currentText]}>
                {page}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        disabled={currentPage === totalPages}
        style={[
          styles.navButton,
          currentPage === totalPages && styles.disabled,
        ]}
      >
        <Text style={styles.navText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  navText: {
    fontSize: 16,
    color: '#007bff',
  },
  pageItem: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  currentPage: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  pageText: {
    fontSize: 14,
    color: '#333',
  },
  currentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ellipsis: {
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 8,
  },
});

export default PaginatedNumComp;
